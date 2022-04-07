import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { collection, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig';
import { AiTwotoneStar } from 'react-icons/ai';
import { BiRupee } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';


function Homepage() {

  let [searchKey, setSearchKey] = useState('');
  let [filterType, setFilterType] = useState('');
  const [products, setProducts] = useState([])
  let [loading, setLoading] = useState(false);
  const history = useNavigate()

  
  useEffect(() => {
    getData()
  }, [])


  async function getData() {

    try {
      setLoading(true)
      const users = await getDocs(collection(fireDB, "products"))
      const productsArray = []
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data()
        }
        productsArray.push(obj)
        setLoading(false)
      });
      setProducts(productsArray)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }



  return (
    <Layout loading={loading}>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">


          <div className="flex flex-wrap mx-14 mb-14">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Search with name
              </label>
              <input value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }} className="appearance-none block w-64 bg-gray-200 text-gray-700 border border-black rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="search items" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Search with Categories
              </label>
              <div className="inline-block relative w-64">
                <select value={filterType} onChange={(e) => { setFilterType(e.target.value) }} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value=''>All</option>
                  <option value="smartwatch">Smart Watches</option>
                  <option value="laptops">Laptops</option>
                  <option value="mobiles">Mobiles</option>
                  <option value="gaming">Gaming Consoles</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6" style={{padding: "41px"}}>
            {products.filter((obj) => obj.name.toLowerCase().includes(searchKey))
              .filter((obj) => obj.category.toLowerCase().includes(filterType))
              .map((product) => (
                <a href={`/productinfo/${product.id}`}>
                  <div key={product.id} className="group relative mb-14 ">
                    <div className="shadow-xl shadow-white w-full min-h-80 bg-white aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">

                      <img
                        src={product.imageURL}
                        alt={product.imageAlt}
                        className="rounded-lg w-full h-full object-contain lg:w-full lg:h-full"
                      />
                    </div>
                    <div className="mt-7">
                      <div>
                        <h1 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0 font-medium" />
                            {product.category}
                        </h1>
                        <p className="mt-1 font-bold text-md text-gray-500">{product.name}</p>
                      </div>
                      <div className='flex justify-between'>
                        <div className=' rounded-lg pl-2 pr-2 p-1 flex justify-evenly mt-3 text-md bg-green-600 text-white'>
                          <span className='mr-2'>4</span>
                          <AiTwotoneStar className='mt-1 text-md' />
                        </div>
                        <p className="flex justify-evenly mt-2 text-2xl  text-gray-900"><BiRupee className='mt-1 text-md' />{product.price}</p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Homepage