import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout';
import { collection, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig';
import { BiRupee } from "react-icons/bi";

function OrdersPage() {

    const [orders, setOrders] = useState([])
    let [loading, setLoading] = useState(false);
    const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid

    useEffect(() => {
        getData()
    }, [])
    async function getData() {

        try {
            setLoading(true)
            const result = await getDocs(collection(fireDB, "orders"))
            const OrdersArray = []
            result.forEach((doc) => {
                OrdersArray.push(doc.data())
                setLoading(false)
            });
            setOrders(OrdersArray)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }


    return (
        <Layout loading={loading}>

            {orders.filter(obj=>obj.userid===userid).map(order => {
                return <div class="max-w-2xl mx-auto my-6 shadow-2xl shadow-indigo-500 mb-24">

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="p-4">
                            <label for="table-search" class="sr-only">Search</label>
                            
                                <div class="relative mt-1">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        
                                    </div>
                                    <h1 type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-80 pl-10 p-2.5">Order No : {Math.floor(Math.random() * 100)}</h1> 
                                    

                                </div>
                          

                        </div>

                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="p-4">
                                        <div class="flex items-center">
                                            Product
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Product name
                                    </th>

                                    <th scope="col" class="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cartItems.map((item) => {
                                    return <tr>
                                        <td className="px-4 py-3">
                                            <img
                                                alt=""
                                                src={item.imageURL}
                                                height="80"
                                                width="80"
                                            />
                                        </td>
                                        <td className="px-4 py-3">{item.name}</td>
                                        <td className="px-4 py-3">{item.category}</td>
                                        <td className="font-bold px-4 py-3">
                                            <BiRupee className="mt-1 text-md" />
                                            {item.price}
                                        </td>
                                    </tr>



                                })}



                            </tbody>
                        </table>

                    </div>

                </div>
            })}





        </Layout>
    )
}

export default OrdersPage