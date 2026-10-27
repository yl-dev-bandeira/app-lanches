import ProdutoCard from "@/components/ProdutoCard";
import { useCart } from "@/contexts/CardContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const produtos=[
  {id:1, nome:'Pão de queijo', preco:4, categoria:"lanches",imagem:require("@/assets/images/Imagens/pao_de_queijo.jpg")},
  {id:2, nome:'Biscoito de queijo', preco:4, categoria:"lanches",imagem:require("@/assets/images/Imagens/biscoito_de_queijo.jpg")},
  {id:3, nome:'Pão com ovo', preco:8, categoria:"lanches",imagem:require("@/assets/images/Imagens/pao_com_ovo.jpg")},
  {id:4, nome:'Torta de frango', preco:12, categoria:"lanches",imagem:require("@/assets/images/Imagens/torta_frango.jpg")},
  {id:5, nome:'Empadão de frango', preco:12, categoria:"lanches",imagem:require("@/assets/images/Imagens/empadao_frango.jpg")},
  {id:6, nome:'Sanduíche natural', preco:6, categoria:"lanches",imagem:require("@/assets/images/Imagens/sanduiche.jpg")},
  {id:7, nome:'Bolo de mandioca', preco:8,categoria:"lanches",imagem:require("@/assets/images/Imagens/bolo_mandioca.jpg")},
  {id:8, nome:'Bolo de milho', preco:7,categoria:"lanches",imagem:require("@/assets/images/Imagens/bolo_milho.jpg")},
  {id:9, nome:'Cuscuz simples', preco:8, categoria:"cuscuz",imagem:require("@/assets/images/Imagens/cuscuz.jpg")},
  {id:10, nome:'Cuscuz completo', preco:10, categoria:"cuscuz",imagem:require("@/assets/images/Imagens/cuscuz.jpg")},
  {id:11, nome:'Tapioca simples', preco:10,categoria:"tapioca",imagem:require("@/assets/images/Imagens/tapioca.jpg")},
  {id:12, nome:'Tapioca recheada', preco:12,categoria:"tapioca",imagem:require("@/assets/images/Imagens/tapioca2.jpg")},
  {id:13, nome:'Maracujá', preco:6,categoria:"bebidas",imagem:require("@/assets/images/Imagens/suco_maracuja.jpg")},
  {id:14, nome:'Acerola', preco:6,categoria:"bebidas",imagem:require("@/assets/images/Imagens/suco_acerola.jpg")},
  {id:15, nome:'Goiaba', preco:6,categoria:"bebidas",imagem:require("@/assets/images/Imagens/suco_goiaba.jpg")},
  {id:16, nome:'Café', preco:5,categoria:"bebidas",imagem:require("@/assets/images/Imagens/cafe.jpg")},
  {id:17, nome:'Pingado', preco:5,categoria:"bebidas",imagem:require("@/assets/images/Imagens/pingado.jpg")},
  {id:18, nome:'Chocolate quente', preco:8,categoria:"bebidas",imagem:require("@/assets/images/Imagens/chocolate_quente.jpg")},
];

export default function Homescreen(){
  const[categoriaSelecionada,setCategoriaSelecionada]=useState('todos');

  const produtosFiltrados=produtos.filter((produto)=>{
    return(
      categoriaSelecionada=='todos'|| produto.categoria==categoriaSelecionada
    );
  })

  const{quantidadeTotal,total}=useCart();

  const router=useRouter();

  return (
    <ScrollView style={styles.container}>
        <View style={styles.cabecalho}>
          <Image source={require("@/assets/images/Imagens/logo-mae-e-filha.jpeg")} style={styles.logo}resizeMode="contain"></Image>
        </View>
        <Text style={styles.titulo}>Cardápio</Text>
        <Pressable style={styles.botaoCarrinho} onPress={()=>router.push('/carrinho')}>
          <Text style={styles.textoCarrinho}>Carrinho({quantidadeTotal}) R${total.toFixed(2).replace(".",",")}</Text>
        </Pressable>
        <Pressable style={styles.botaoAdmin} onPress={()=>router.push('/admin')}>
          <Text style={styles.textoBotaoAdmin}>Área Administrativa</Text>
        </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtros}>
            {[{id:'todos', nome:'Todos'},
              {id:'lanches', nome:"Lanches"},
              {id:'cuscuz', nome:'Cuscuz'},
              {id:'tapioca', nome:'Tapiocas'},
              {id:'bebidas', nome:"Bebidas"}
            ].map((categoria)=>(
              <Pressable 
              key={categoria.id} 
              onPress={()=>setCategoriaSelecionada(categoria.id)}
              style={[
                styles.filtro,
                categoriaSelecionada==categoria.id&&styles.filtroAtivo,
              ]}>
                <Text style={[
                  styles.textoFiltro,
                  categoriaSelecionada==categoria.id&&styles.textoFiltroAtivo
                ]}>
                  {categoria.nome}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

        <View style={styles.lista}>
          {produtosFiltrados.map((produto)=>(
            <ProdutoCard key={produto.id} produto={produto}/>
          ))}
        </View>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    padding: 20,
    backgroundColor:'#FFE5EC',
  },
  cabecalho:{
    width:'100%',
    height:180,
    alignSelf:'center',
    backgroundColor:'#FFC2D1',
    marginBottom:12,
    borderRadius:12,
    overflow:'hidden',
  },
  logo:{
    width:'100%',
    height:'100%',
  },
  titulo:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:20,
    color:'#C9184A'
  },
  lista:{
    gap:10,
  },
  produto:{
    padding:15,
    borderWidth:1,
    borderColor:'#FFB3C6',
    borderRadius: 10,
    backgroundColor:'#FFFFFF'
  },
  nome:{
    fontSize:20,
    fontWeight:"bold",
    color:"#333333"
  },
  preco:{
    fontSize:16,
    marginTop:5,
    color:'#C9184A',
    fontWeight:'600',
  },
  filtros:{
    flexGrow:0,
    marginBottom:16,
  },
  filtro:{
    paddingVertical:10,
    paddingHorizontal:16,
    borderRadius:20,
    borderWidth:1,
    borderColor:'#FFB3C6',
    marginRight:8,
    backgroundColor:'#FFFFFF'
  },
  filtroAtivo:{
    backgroundColor:"#C9184A",
    borderColor:"#C9184A",
  },
  textoFiltro:{
    fontSize:16,
    color:'#C9184A'
  },
  textoFiltroAtivo:{
    color:'#FFFFFF',
    fontWeight:'bold',
  },
  botaoCarrinho:{
    backgroundColor:'#C9184A',
    padding:15,
    borderRadius:10,
    alignItems:'center',
    marginBottom:18,
  },
  textoCarrinho:{
    color:"#FFFFFF",
    fontSize:16,
    fontWeight:'bold'
  },
  botaoAdmin:{
    marginTop:24,
    marginBottom:20,
    padding:14,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#C9184A',
    alignItems:'center',
    backgroundColor:'#FFFFFF',
  },
  textoBotaoAdmin:{
    color:'#C9184A',
    fontSize:16,
    fontWeight:'bold',
  },
});