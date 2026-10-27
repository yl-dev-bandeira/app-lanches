import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AdminScreen(){
    const router=useRouter();

    const saldo=0;

    const corSaldo=saldo<0 ? "#DC2626" : saldo>0 ? "#16A34A":"#64748B";

    const saldoFormatado=saldo.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Área Administrativa</Text>
            <Text style={styles.subtitulo}>Painel do controle</Text>

            <View style={styles.grade}>
                <View style={styles.cartao}>
                    <Text style={styles.nomeCartao}>Pedidos</Text>
                    <Text style={styles.descricao}>Consultar vendas</Text>
                </View>
                <View style={styles.cartao}>
                    <Text style={styles.nomeCartao}>Relatórios</Text>
                    <Text style={styles.descricao}>Resumo financeiro</Text>
                </View>
                <View style={styles.cartao}>
                    <Text style={styles.nomeCartao}>Saldo</Text>
                    <Text style={[styles.valorSaldo,{color:corSaldo}]}>{saldoFormatado}</Text>
                    <Text style={styles.descricao}>Receitas menos despesas</Text>
                </View>
                <View style={styles.cartao}>
                    <Text style={styles.nomeCartao}>Exportação</Text>
                    <Text style={styles.descricao}>Exportar relatórios</Text>
                </View>
            </View>
            <Pressable style={styles.botaoVoltar} onPress={()=>router.back()}>
                <Text style={styles.textoBotao}>Voltar ao cardápio</Text>
            </Pressable>
        </ScrollView>
    );
}
const styles=StyleSheet.create({
    container:{
        flexGrow:1,
        padding:20,
        paddingTop:30,
        backgroundColor:"#FFE5EC",
    },
    titulo:{
        fontSize:27,
        fontWeight:"bold",
        color:"#C9184A"
    },
    subtitulo:{
        fontSize:15,
        color:"#780016",
        marginTop:8,
        marginBottom:24,
    },
    grade:{
        flexDirection:'row',
        flexWrap:'wrap',
        gap:12,
    },
    cartao:{
        width:'48%',
        flexGrow:1,
        flexBasis:140,
        minHeight:155,
        padding:16,
        backgroundColor:'#FFFFFF',
        borderRadius:14,
        borderWidth:1,
        borderColor:'#FFB3C6',
        justifyContent:'center',
        gap:8
    },
    nomeCartao:{
        fontSize:17,
        fontWeight:'bold',
        color:'#C9184A',
    },
    descricao:{
        fontSize:12,
        color:"#780016"
    },
    valorSaldo:{
        fontSize:19,
        fontWeight:'bold'
    },
    botaoVoltar:{
        marginTop:26,
        padding:15,
        borderRadius:10,
        backgroundColor:'#C9184A',
        alignItems:'center'
    },
    textoBotao:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'bold'
    }
},);