import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { BiRupee } from "react-icons/bi";
import { IoMdTrash } from "react-icons/io";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addDoc, collection } from 'firebase/firestore'
import fireDB from '../fireConfig';
import { toast } from "react-toastify";


function CartPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const [loading, setLoading] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItems) => {
      temp = temp + cartItems.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeorder = async () => {
    const addressInfo = {
      name,
      email,
      country,
      address,
      city,
      state,
      pincode,
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      userid: JSON.parse(localStorage.getItem('currentUser')).user.uid,
    }
    console.log(orderInfo)


    try {
      setLoading(true)
      const result = await addDoc(collection(fireDB, 'orders'), orderInfo)
      setLoading(false)
      toast.success('Order Placed')
      setOpen(false)
      const myTimeout = setTimeout(myGreeting, 3000);

function myGreeting() {
  window.location.href='/orders'
}
     
    } catch (error) {
      setLoading(false)
      toast.error('Cannot place order')

    }



  }

  return (
    <Layout loading={loading}>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              My Cart
            </h1>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Product
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Category
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Price
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Action
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr>
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
                      <td className="p-7 text-red-700 ">
                        <IoMdTrash
                          onClick={() => deleteFromCart(item)}
                          className="text-xl hover:animate-ping"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <button
              onClick={() => setOpen(true)}
              className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      </section>

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
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full sm:mx-0 sm:h-12 sm:w-12">
                      <img
                        className="block h-8 w-auto hover:animate-spin"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Product Summary
                      </Dialog.Title>
                      <div className="flex justify-start mt-2 mb-4">
                        <span className="mt-1 ml-2 ">
                          Please confirm your order
                        </span>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mt-1 ml-1 text-orange-400 animate-ping"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                              Product
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                              Name
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                              Category
                            </th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => {
                            return (
                              <>
                                <tr>
                                  <td className="px-4 py-3">
                                    <img
                                      alt=""
                                      src={item.imageURL}
                                      height="80"
                                      width="80"
                                    />
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    {item.name}
                                  </td>
                                  <td className="px-4 py-3">{item.category}</td>
                                  <td className="font-bold px-4 py-3">
                                    <BiRupee className="mt-1 text-md" />
                                    {item.price}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>

                      <div className="hidden sm:block" aria-hidden="true">
                        <div className="py-5">
                          <div className="border-t border-gray-200" />
                        </div>
                      </div>

                      <div className="mt-10 sm:mt-0">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                          <div className="md:col-span-1">
                            <div className="px-4 sm:px-2 mt-8">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Personal Information
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                Use a permanent address where you can receive
                                delivery.
                              </p>
                            </div>
                          </div>
                          <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="shadow overflow-hidden sm:rounded-md">
                              <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                  <div className="col-span-6 sm:col-span-6">
                                    <label
                                      htmlFor="first-name"
                                      className="block text-md font-medium text-gray-700"
                                    >
                                      Name
                                    </label>
                                    <input
                                      id="name"
                                      name="name"
                                      value={name}
                                      onChange={(e) => { setName(e.target.value) }}
                                      type="text"
                                      autocomplete="current-name"
                                      required=""
                                      placeholder="Enter your Name"
                                      className=" mt-1
            block
            w-full
            px-3
            py-1
            text-base
            placeholder-gray-300
            transition
            duration-500
            ease-in-out
            transform
            border border-transparent
            rounded-lg
            text-neutral-600
            bg-gray-50
            focus:border-transparent
            focus:ring-2
            focus:ring-white
            focus:ring-offset-2"/>
                                  </div>

                                  <div className="col-span-6 sm:col-span-6">
                                    <label
                                      htmlFor="email-address"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Email address
                                    </label>
                                    <input
                                      id="email"
                                      value={email}
                                      onChange={(e) => { setEmail(e.target.value) }}
                                      name="email"
                                      type="email"
                                      autocomplete="current-email"
                                      required=""
                                      placeholder="Enter your email"
                                      className=" mt-1
          block
          w-full
          px-3
          py-1
          text-base
          placeholder-gray-300
          transition
          duration-500
          ease-in-out
          transform
          border border-transparent
          rounded-lg
          text-neutral-600
          bg-gray-50
          focus:border-transparent
          focus:ring-2
          focus:ring-white
          focus:ring-offset-2"/>
                                  </div>

                                  <div className="col-span-6 sm:col-span-6">
                                    <label
                                      htmlFor="country"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Country
                                    </label>
                                    <select
                                      id="country"
                                      name="country"
                                      autoComplete="country-name"
                                      value={country}
                                      onChange={(e) => { setCountry(e.target.value) }}
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                      <option>Select</option>
                                      <option>Canada</option>
                                      <option>Mexico</option>
                                    </select>
                                  </div>

                                  <div className="col-span-6">
                                    <label
                                      htmlFor="street-address"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Street address
                                    </label>
                                    <textarea
                                      type="text"
                                      value={address}
                                      onChange={(e) => { setAddress(e.target.value) }}
                                      name="street-address"
                                      id="street-address"
                                      autoComplete="street-address"
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>

                                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label
                                      htmlFor="city"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      value={city}
                                      onChange={(e) => { setCity(e.target.value) }}
                                      name="city"
                                      id="city"
                                      autoComplete="address-level2"
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>

                                  <div className="col-span-6 sm:col-span-3 lg:col-span-4">
                                    <label
                                      htmlFor="region"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      State / Province
                                    </label>
                                    <input
                                      type="text"
                                      value={state}
                                      onChange={(e) => { setState(e.target.value) }}
                                      name="region"
                                      id="region"
                                      autoComplete="address-level1"
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>

                                  <div className="col-span-6 sm:col-span-3 lg:col-span-4">
                                    <label
                                      htmlFor="postal-code"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      ZIP / Postal code
                                    </label>
                                    <input
                                      type="text"
                                      value={pincode}
                                      onChange={(e) => { setPincode(e.target.value) }}
                                      name="postal-code"
                                      id="postal-code"
                                      autoComplete="postal-code"
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={placeorder}
                    type="button"
                    className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Total : {totalAmount} Rs
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default CartPage;
