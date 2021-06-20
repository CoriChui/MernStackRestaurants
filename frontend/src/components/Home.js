import axios from "axios"
import React, { useState, useEffect, useRef } from "react"
import Restaurants from './restaurant/Restaurants'
import Search from './restaurant/Search'
import CuisineSearch from './restaurant/CuisineSearch'
import PaginationNav from './restaurant/PaginationNav'

const Home = () => {

  const [restaurants, setRestaurants] = useState([])
  const [cuisines, setCuisines] = useState(["All Cuisines"])
  const currentQuery = useRef("")
  const currentBy = useRef("")
  const totalPages = useRef(1)
  const page = useRef(1)

  useEffect(() => {
    retrieveRestaurants()
    retrieveCuisines()
  }, [])

  const retrieveRestaurants = async (page = 0) => {
    await axios.get(`/api/v1/restaurants?page=${page}`)
      .then(res => {
        totalPages.current = Math.ceil(res.data.total_results / 20.0)
        setRestaurants(res.data.restaurants)
      })
      .catch(() => {
        setRestaurants([])
      })
  }

  const retrieveCuisines = async () => {
    await axios.get(`/api/v1/restaurants/cuisines`)
      .then(res => {
        setCuisines(["All Cuisines"].concat(res.data))
      })
      .catch(() => {
        setRestaurants([])
      })
  }

  const refreshList = () => {
    retrieveRestaurants()
  }

  const findById = async (page, query = "", by = "name") => {
    await axios.get(`/api/v1/restaurants?${by}=${query}&page=${page}`)
      .then(res => {
        totalPages.current = Math.ceil(res.data.total_results / 20.0)
        currentQuery.current = query
        currentBy.current = by
        setRestaurants(res.data.restaurants)
      })
      .catch(() => {
        setRestaurants([])
      })
  }

  const findByName = (name) => {
    page.current = 1
    findById(0, name, "name")
  }

  const findByZip = (zip) => {
    page.current = 1
    findById(0, zip, "zipcode")
  }

  const findByCuisine = (cuisine) => {
    if (cuisine === "All Cuisines") {
      page.current = 1
      refreshList()
    } else {
      page.current = 1
      findById(0, cuisine, "cuisine")
    }
  }

  const onNextPageHandler = () => {
    if (page.current < totalPages.current) {
      page.current++
      findById(page.current, currentQuery.current, currentBy.current)
    }
  }

  const onPrevPageHandler = () => {
    if (page.current !== 1) {
      page.current--
      findById(page.current, currentQuery.current, currentBy.current)
    }
  }

  return (
    <div className="mx-3">
      <div className="row mb-3 mt-3">
        <Search type="text" placeholder="Search by name" callback={findByName} />
        <Search type="text" placeholder="Search by zip" callback={findByZip} />
        <CuisineSearch cuisines={cuisines} callback={findByCuisine} />
      </div>
      <div className="row justify-content-center">
        {restaurants && <Restaurants restaurants={restaurants} />}
      </div>
      <PaginationNav page={page.current} total={totalPages.current} prev={onPrevPageHandler} next={onNextPageHandler} />
    </div>
  )
}

export default Home