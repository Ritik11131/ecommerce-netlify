import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import "../stylesheets/admin.css";
import Loader from "../components/Loader";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { BiRupee } from "react-icons/bi";

function AdminPage() {
    const [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            setLoading(true);
            const users = await getDocs(collection(fireDB, "products"));
            const productsArray = [];
            users.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    ...doc.data(),
                };
                productsArray.push(obj);
                setLoading(false);
               
            });
            setProducts(productsArray);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const addHandler = () => {
        setOpen(true);
    };

    const [imageURL, setImageURL] = useState("");
    const [price1, setPrice1] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");

    const addProduct = async () => {
        try {
            const price = parseInt(price1);
            setOpen(false);
            setLoading(true);
            const docRef = await addDoc(collection(fireDB, "products"), {
                name,
                price,
                description,
                category,
                imageURL,
            });
            setLoading(false);
            toast.success("Product Added");
            window.location.reload();
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Oops, Something is wrong");
        }
    };

    const deleteProduct = async (item) => {
        try {
            setLoading(true);
            await deleteDoc(doc(fireDB, "products", item.id));
            toast.success("Product Deleted Successfully");
            getData();
        } catch (error) {
            toast.failed("Oops, Can't Delete");
            setLoading(false);
        }
    };

    useEffect(() => {
        getDataOrders()
    }, [])

    async function getDataOrders() {

        try {
            setLoading(true)
            const result = await getDocs(collection(fireDB, "orders"))
            const OrdersArray = []
            result.forEach((doc) => {
                OrdersArray.push(doc.data())
                setLoading(false)
            });
            setOrders(OrdersArray)
            console.log(OrdersArray)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    return (
        <Layout>
            {loading && <Loader />}

            <div className="container px-5 py-24 mx-auto">

                <div className="lg:w-2/3 w-full mx-auto overflow-auto text-xl font-bold mt-2 mb-2 text-left">
                    <div className="flex justify-between">

                        <h1>
                            S T O R E
                        </h1>
                        <button
                            onClick={addHandler}
                            type="button"
                            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                            <AiOutlinePlus />
                        </button>

                    </div>
                </div>
                <div className="lg:w-2/3 w-full mx-auto overflow-auto shadow-2xl shadow-indigo-500">
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-900 text-sm text-gray-100 rounded-tl rounded-bl">
                                    Product
                                </th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-900 text-sm text-gray-100">
                                    Name
                                </th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-900 text-sm text-gray-100">
                                    Category
                                </th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-900 text-sm text-gray-100">
                                    Price
                                </th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium bg-gray-900 text-sm text-gray-100">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((item) => {
                                return (
                                    <tr>
                                        <td className="px-4 py-3">
                                            <img alt="" src={item.imageURL} height="80" width="80" />
                                        </td>
                                        <td className="px-4 py-3">{item.name}</td>
                                        <td className="px-4 py-3">{item.category}</td>
                                        <td className="font-bold px-4 py-3">{item.price}</td>
                                        <td className="p-7 text-indigo-700 ">
                                            <IoMdTrash
                                                onClick={() => {
                                                    deleteProduct(item);
                                                }}
                                                className="text-2xl hover:animate-pulse"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>


                <div className="lg:w-2/3 w-full mx-auto overflow-auto text-xl font-bold mt-2 mb-2 text-left">
                    <div className="flex justify-between mt-20">

                        <h1>
                            O R D E R S
                        </h1>
                        

                    </div>
                </div>

                {orders.map(order => {
                    return <div class="max-w-2xl mx-auto my-6 shadow-2xl shadow-indigo-500 mb-24">

                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <div class="p-4">
                                <label for="table-search" class="sr-only">Search</label>

                                <div class="flex  mt-1">
                                    
                                    <h1 type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-80 pl-5 pt-3 pb-3">Order No : {order.userid}</h1>
                                    <h1 type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-80 pl-5 pt-3 pb-3">Email ID : {order.email}</h1>



                                </div>


                            </div>

                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-white uppercase bg-gray-700 ">
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



            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                            <img
                                                className="block h-8 w-auto animate-spin"
                                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                                alt="Workflow"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-2xl leading-6 font-medium text-gray-900"
                                            >
                                                Add a product
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Well! I think you got some new products for our store!
                                                    😮
                                                </p>
                                            </div>
                                            <div className="mt-4">
                                                <form class="w-full max-w-sm">
                                                    <div class="md:flex md:items-center mb-6">
                                                        <div class="md:w-1/3">
                                                            <label
                                                                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                                                for="inline-full-name"
                                                            >
                                                                Image Link
                                                            </label>
                                                        </div>
                                                        <div class="md:w-2/3">
                                                            <input
                                                                value={imageURL}
                                                                onChange={(e) => {
                                                                    setImageURL(e.target.value);
                                                                }}
                                                                placeholder="Link"
                                                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                                id="inline-full-name"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="md:flex md:items-center mb-6">
                                                        <div class="md:w-1/3">
                                                            <label
                                                                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                                                for="inline-full-name"
                                                            >
                                                                Name
                                                            </label>
                                                        </div>
                                                        <div class="md:w-2/3">
                                                            <input
                                                                value={name}
                                                                onChange={(e) => {
                                                                    setName(e.target.value);
                                                                }}
                                                                placeholder="Link"
                                                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="md:flex md:items-center mb-6">
                                                        <div class="md:w-1/3">
                                                            <label
                                                                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                                                for="inline-full-name"
                                                            >
                                                                Description
                                                            </label>
                                                        </div>
                                                        <div class="md:w-2/3">
                                                            <input
                                                                value={description}
                                                                onChange={(e) => {
                                                                    setDescription(e.target.value);
                                                                }}
                                                                placeholder="Link"
                                                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                                id="inline-full-name"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="md:flex md:items-center mb-6">
                                                        <div class="md:w-1/3">
                                                            <label
                                                                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                                                for="inline-full-name"
                                                            >
                                                                Category
                                                            </label>
                                                        </div>
                                                        <div class="md:w-2/3">
                                                            <input
                                                                value={category}
                                                                onChange={(e) => {
                                                                    setCategory(e.target.value);
                                                                }}
                                                                placeholder="Link"
                                                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                                id="inline-full-name"
                                                                type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="md:flex md:items-center mb-6">
                                                        <div class="md:w-1/3">
                                                            <label
                                                                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                                                for="inline-full-name"
                                                            >
                                                                Price
                                                            </label>
                                                        </div>
                                                        <div class="md:w-2/3">
                                                            <input
                                                                value={price1}
                                                                onChange={(e) => {
                                                                    setPrice1(e.target.value);
                                                                }}
                                                                placeholder="Link"
                                                                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                                id="inline-full-name"
                                                                type="number"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700  sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={addProduct}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </Layout>
    );
}

export default AdminPage;
