"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // ✅ use next/link, not react-router-dom

export default function Home() {
  const [filterData, setFilter] = useState([]);
  const [product, setProduct] = useState([]);
  const [res, setRes] = useState(null);

  useEffect(() => {
    // Fetch products
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProduct(data));

    // Fetch Next.js API
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => setRes(data));
  }, []); // ✅ add dependency array so it runs once

  return (
    <div className="flex flex-col w-full-screen">
      <div
        className="hero h-150"
        style={{
          backgroundImage:
            "url(https://www.shutterstock.com/image-illustration/special-offer-sales-banner-shop-260nw-2046644237.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-4 mt-10">
        {product.map((pro) => (
          <div key={pro.id}>
            <div className="card bg-base-300">
              <figure>
                <img
                  src={pro.image}
                  alt={pro.title}
                  className="w-[50%] h-50 bg-red-100"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-center">
                  {pro.title
                    ? pro.title.length > 30
                      ? pro.title.slice(0, 30) + "..."
                      : pro.title
                    : "No title"}
                </h2>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                  <button className="btn btn-primary">Add Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <h2 className="text-xl font-bold">API Response:</h2>
        <pre>{res ? JSON.stringify(res, null, 2) : "Loading..."}</pre>
      </div>
    </div>
  );
}
