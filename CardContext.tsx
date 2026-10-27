import { createContext, ReactNode, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

export type Produto={
    id:number;
    nome:string;
    preco:number;
    categoria:string;
    imagem:ImageSourcePropType;
};

export type ItemCarrinho={
    produto:Produto;
    quantidade:number;
};

type CartContextType={
    itens:ItemCarrinho[];
    adicionar:(produto:Produto)=>void;
    remover:(id:number)=>void;
    alterarQuantidade:(id:number,quantidade:number)=>void
    limpar:()=>void;
    total:number;
    quantidadeTotal:number;
}

const CartContext=createContext<CartContextType |undefined>(undefined);

export function CartProvider({children}:{children:ReactNode}){
    const[itens,setItens]=useState<ItemCarrinho[]>([]);


function adicionar(produto:Produto){
    setItens((atuais)=>{
        const existente=atuais.find(
            (item)=>item.produto.id===produto.id
        );
    if(existente){
        return atuais.map((item)=>item.produto.id===produto.id ?{...item,quantidade:item.quantidade+1}:item)
    }
    return [...atuais,{produto,quantidade:1}];
    });
}

function remover(id:number){
    setItens((atuais)=>atuais.filter((item)=> item.produto.id!==id));
}

function alterarQuantidade(id:number,quantidade:number){
    if(quantidade<=0){
        remover(id);
        return;
    }
    setItens((atuais)=>atuais.map((item)=>item.produto.id===id ?{...item,quantidade}:item));
}

function limpar(){
    setItens([]);
}

const total=itens.reduce((soma,item)=>soma+item.produto.preco*item.quantidade,0);

const quantidadeTotal=itens.reduce((soma,item)=>soma+item.quantidade,0);

return(
    <CartContext.Provider
        value={{
            itens,
            adicionar,
            remover,
            alterarQuantidade,
            limpar,
            total,
            quantidadeTotal,
        }}>{children}</CartContext.Provider>
);}

export function useCart(){
    const contexto=useContext(CartContext);

    if(!contexto){
        throw new Error("useCart precisa ser usado dentro de um CartProvider");
    }
    return contexto;
}
