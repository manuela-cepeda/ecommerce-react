import ItemCount from "./ItemCount";

const ItemListContainer = ({ greeting }) => {
  const onAdd = (count) => {
    alert(`se agregaron ${count} productos`)
  }
  return (
    <>
      <div>{greeting}</div>
      <ItemCount stock={5} initial={1} onAdd={onAdd} />
    </>
  )
}

export default ItemListContainer;