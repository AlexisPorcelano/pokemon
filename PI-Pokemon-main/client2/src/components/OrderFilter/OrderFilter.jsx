import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, order, reset } from "../../Redux/actions";
import styles from './OrderFilter.module.css'

export default function OrderFilter({showFilters, setShowFilters}) {
  const types = useSelector((state) => state.types);
  const pokeCards = useSelector((state) => state.pokeCards);
  const dispatch = useDispatch();

  const [orderValue, setOrderValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Order") {
        setOrderValue(value);
    }
    if (name === "Filter") {
        setFilterValue(value);
    }
  };

  const handleReset = () => {
    setOrderValue(''); // Reset orderValue
    setFilterValue(''); // Reset filterValue

    const onScreenOrderValue = document.getElementById("order-select")
    const onScreenFilterValue = document.getElementById("filter-select")
    dispatch(reset());
    setShowFilters(false)
  };

  useEffect(() => {
    dispatch(order(orderValue));
    dispatch(filter(filterValue));
  }, [orderValue, filterValue]);

  return (
    <div className={styles.container} >
        <div className={styles.container2} >
      <h4 className={styles.text} >Order: </h4>
      <select className={styles.select} name="Order" id="order-select" onChange={handleChange} value={orderValue}>
        <option className={styles.option} value="">---</option>
        <option className={styles.option} value="asc">Ascendant</option>
        <option className={styles.option} value="des">Descendant</option>
      </select>
      </div>
      <div className={styles.container2} >
      <h4 className={styles.text} >Type: </h4>
      <select className={styles.select} name="Filter" id="filter-select" onChange={handleChange} value={filterValue}>
        <option className={styles.option} value="">---</option>
        {types.map((e, i) => e && <option className={styles.option} key={i}> {e.name} </option>)}
      </select>
      </div>
      <button className={styles.button} type="button" onClick={() => handleReset()}>Reset</button>
    </div>
  );
}
