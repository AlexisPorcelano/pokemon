import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, getPokemons, order, reset, originFilter } from "../../Redux/actions";
import styles from './OrderFilter.module.css'

export default function OrderFilter({showFilters, setShowFilters}) {
  const types = useSelector((state) => state.types);
  const pokeCards = useSelector((state) => state.pokeCards);
  const dispatch = useDispatch();

  const [orderValue, setOrderValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [originValue, setOriginValue] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Order") {
        setOrderValue(value);
    }
    if (name === "Filter") {
      console.log('filter value changing');
        setFilterValue(value);
    }
    if (name === 'Origin') {
      console.log('origin value changing');
      setOriginValue(value)
  }
  };

  useEffect(() => {
    if(filterValue !== '')dispatch(filter(filterValue));
  }, [filterValue])

  useEffect(()=>{
    if(originValue !== '')dispatch(originFilter(originValue))
  }, [originValue])

  useEffect(() => {
    console.log('order value:', originValue);
    if(orderValue !== '') dispatch(order(orderValue));
  }, [orderValue]);

  return (
    <div className={styles.container} >

    <select className={styles.select} name="Order" id="order-select" onChange={handleChange} value={orderValue}>
      <option className={styles.option} value="">Order</option>
      <option className={styles.option} value="asc">Ascendant</option>
      <option className={styles.option} value="des">Descendant</option>
      <option className={styles.option} value="atk+">Attack +</option>
      <option className={styles.option} value="atk-">Attack -</option>

    </select>

    <select className={styles.select} name="Filter" id="filter-select" onChange={handleChange} value={filterValue}>
      <option className={styles.option} value="">Type</option>
      {types.map((e, i) => e && <option className={styles.option} key={i}> {e.name} </option>)}
    </select>

      <select className={styles.select} name="Origin" id="origin-select" onChange={handleChange} value={originValue}>
      <option className={styles.option} value="">Origin</option>
      <option className={styles.option} >From API</option>
      <option className={styles.option} >From database</option>
      </select>
  </div>
  );
}
