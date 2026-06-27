const SelectedProduct = () => {
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    name: "TRAPPED IN HER EYES TEE",
    price: 1200,
    oldPrice: 2000,
    images: [
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "ROUND NECK T-SHIRT\nOVERSIZED SLEEVES\nPRINTED WITH EVERYTHING.",
    features: [
      "OVERSIZED FIT",
      "PRINT ON FRONT",
      "MADE IN INDIA",
      "280 GSM",
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* Left Section */}
        <div className="space-y-8">

          {product.images.map((image, index) => (
            <div
              key={index}
              className="relative border bg-gray-100 flex justify-center items-center"
            >
              <img
                src={image}
                alt="Product"
                className="w-full object-cover"
              />

              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:scale-105 transition">
                <Search size={18} />
              </button>
            </div>
          ))}

        </div>

        {/* Right Section */}
        <div className="sticky top-24 h-fit">

          <h1 className="text-3xl font-bold uppercase tracking-wide">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-semibold">
              INR {product.price.toLocaleString()}
            </span>

            <span className="text-gray-400 line-through">
              INR {product.oldPrice.toLocaleString()}
            </span>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <h3 className="font-medium mb-4">Select Size</h3>

            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full border transition
                    ${selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="border border-black px-8 py-3 uppercase text-sm hover:bg-black hover:text-white transition">
              Add To Cart
            </button>

            <button className="bg-black text-white px-8 py-3 uppercase text-sm hover:bg-gray-800 transition">
              Buy It Now
            </button>
          </div>

          {/* Description */}
          <div className="mt-10 text-sm text-gray-700 leading-7 whitespace-pre-line">
            {product.description}
          </div>

          {/* Features */}
          <div className="mt-8">
            <h3 className="uppercase font-semibold mb-4">Features</h3>

            <ul className="list-disc ml-5 space-y-2 text-sm">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SelectedProduct;