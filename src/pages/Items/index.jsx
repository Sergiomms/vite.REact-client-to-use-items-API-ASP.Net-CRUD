import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemSelector } from "../../store/modules/items/selectors";
import { createItem, deleteItem, editItem, itemsRequest, itemRequest } from "../../store/modules/items/actions";
import { formatCurrencyBRL } from "../../utils/utils";
import { Form, Input } from '@rocketseat/unform';

export default function Items() {

  const { 
    loadingItems,
    loadingCreate,
    loadingEdit,
    successItems,
    successItem,
    successDelete,
    errorItem,
    successCreate,
    successEdit 
  } = useSelector(itemSelector);

  const [items, setItems] = useState([])
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const route = "Pecas";

  const dispatch = useDispatch();

  const createEditItemSubmit = () => {

    if (description === "" || price === "") {
      alert("Preencher todos os campos")
    } else {
      if (!edit) {
        dispatch(
          createItem(
            {
              route,
              description,
              price: parseFloat(Number(price)).toFixed(2)
            }
          )
        )
      } else {
        dispatch(
          editItem(
            {
              route,
              id,
              description,
              price: parseFloat(Number(price)).toFixed(2)
            }
          )
        )
      }
    }



  }

  const searchItemSubmit = () => {
    if(id !== null && id !== 0) {
      dispatch(
        itemRequest(
          {
            route,
            id
          }
        )
      )
    } else {
      alert("Preencher um N° de id válido!")
    }
  }

  const ShowItem = (
    <>
      <p>{edit ? "Editar Item" : "Adicionar Item"}</p>
      <br />
      <br />
      <p>{description === "" ? '----' : description}</p>
      <br />
      <br />
      <Form onSubmit={createEditItemSubmit}>
        <label for="descricao">Descrição:</label>
        <Input
          type="text"
          id="descricao"
          name="descricao"
          placeholder="Digite a descrição"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <br />
        <br />
        <label for="preco">Preço:</label>
        <Input
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          id="preco"
          placeholder="Digite o preço"
          name="preco"
          maxLength="9"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />

        <br />
        <br />
        <Input type="submit" name="enviar" value="Enviar" />
        {edit && (<button onClick={() => {
          setId(0);
          setDescription("");
          setPrice(0);
          setEdit(false)
        }}>Cancelar</button>)}
      </Form>
    </>
  );

  // Get items on page load
  useEffect(() => {
    dispatch(itemsRequest({ route }));
    setId(0);
    setDescription("");
    setPrice("");
    setEdit(false);
  }, []);

  useEffect(() => {
    if (successItems.length > 0) {
      setItems(successItems)
    } else {
      setItems([])
    }
  }, [successItems])

  useEffect(() => {
    setId(0);
    setDescription("");
    setPrice("");
    setEdit(false);
  }, [successCreate, successEdit, successItem, successDelete])

  useEffect(() => {
    if(errorItem) {
      alert("Id não existe ou não foi encontrado. Por favor, tente novamente!")
    }
  }, [errorItem])

  return (
    <>
      <h2>Itens Cadastrados</h2>
      <br />
      <Form onSubmit={searchItemSubmit}>
        <label for="buscar">Buscar Item:</label>
        <Input
          type="number"
          id="buscar"
          name="buscar"
          placeholder="Digite o id do item."
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        <Input type="submit" name="buscar" value="Buscar" />
      </Form>
      <br />
      {successItem?.id && (
        <div>
          <p>ID: {successItem.id}</p>
          <p>Descrição: {successItem.descricao}</p>
          <p>Preço: {formatCurrencyBRL(successItem.preco, 2)}</p>
          <button onClick={() => {
            setId(successItem.id);
            setDescription(successItem.descricao);
            setPrice(successItem.preco);
            setEdit(true);
          }}>Editar</button>
          <button
            onClick={() => dispatch(deleteItem({ route, id: Number(successItem.id) }))}
          >Excluir</button>
        </div>
      )}
      
      <br />
      {loadingCreate || loadingItems || loadingEdit ? "Loading..." : (
        <table>
          <thead>
            <tr>
              <th style={{ border: "solid #ccc" }}>ID do Item</th>
              <th style={{ border: "solid #ccc" }}>Descrição do Item</th>
              <th style={{ border: "solid #ccc" }}>Preço do Item</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item) => {
              return (
                <tr key={`${item.id}-Tr`}>
                  <td >{item.id}</td>
                  <td >{item.descricao}</td>
                  <td >{formatCurrencyBRL(item.preco, 2)}</td>
                  <td><button onClick={() => {
                    setId(item.id);
                    setDescription(item.descricao);
                    setPrice(item.preco);
                    setEdit(true);
                  }}>Editar</button></td>
                  <td>
                    <button onClick={() =>
                      dispatch(deleteItem({ route, id: Number(item.id) }))}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              )

            }) : (<tr> <td >Não há items para serem exibidos</td></tr>)}
          </tbody>
        </table>
      )}

      <br />
      {ShowItem}

    </>
  )
}