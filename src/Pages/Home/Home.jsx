import "./Home.css";
import Logo from "../../assets/images/logo.png";
import Cart from "../../assets/images/cart.png";
import Notification from "../../assets/images/notification.png";
import Men from "../../assets/images/men.png";
import Steak from "../../assets/images/steak.png";
// import Carrot from "../../assets/images/Carrot.png";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  // const subCategories = categories.map((categories) => categories.sub_category);
  // const newSubCategories = subCategories.flatMap((e) => e);
  const [subCategoriesItem, setCategoriesItem] = useState([]);
  // const subCategoriesItem = newSubCategories.map((categories) => categories.items);
  // const newSubCategoriesItem = subCategoriesItem.flatMap((e) => e);
  const [active, setActive] = useState("");
  const [active2, setActive2] = useState("");

  useEffect(() => {
    fetch("https://grocerywatch.herokuapp.com/market/data/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
        setSubCategories(data.categories[0].sub_category);
        setCategoriesItem(data.categories[0].sub_category[0].items);
        console.log(categories)
        setActive(data.categories[0].id)
        setActive2(data.categories[0].sub_category[0].id)
        setLoading(false);
      });
  }, []);

  // console.log(subCategories)
  const handleCategories = (id) => {
    const selectedCategory = categories.filter(
      (category) => category.id === id
    );
    setSubCategories(selectedCategory[0].sub_category);
    // console.log(subCategories)
    // console.log(selectedCategory)
    setCategoriesItem(selectedCategory[0].sub_category[0].items);
    // console.log(subCategoriesItem)
  };
  const handldleSubCategories = (id) => {
    const selectedSubCategory = subCategories.filter(
      (category) => category.id === id
    );
    // console.log(subCategories)
    // console.log(selectedSubCategory[0].items);
    setCategoriesItem(selectedSubCategory[0].items);
  };

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      <header className="">
        <nav>
          <div className="left-side">
            <img src={Logo} />
          </div>
          <div className="right-side">
            <div className="cart-image">
              <img className="cart" src={Cart} />
            </div>
            <img src={Notification} />
            <img src={Men} />
          </div>
        </nav>
      </header>
      <section id="categories" className="container">
        <h2>Categories</h2>
        <div className="categories-item">
          {categories.map((category) => (
            <button
              key={category.id}
              className={category.id === active ? 'active' : ''}
              onClick={() => {
                handleCategories(category.id);
                setActive(category.id);
                setActive2(category.sub_category[0].id);
              }}
            >
              <img src={category.image} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="sub-categories" className="container">
        <h2>Sub-Cateogories</h2>
        <div className="sub-categories-item">
          {subCategories.map((subCategories) => (
            <button
              className={subCategories.id === active2 ? 'active' : ''}
              onClick={() => {
                handldleSubCategories(subCategories.id)
                // setActive(subCategories.id);
                setActive2(subCategories.id)
              }}
            >
              <img src={subCategories.image} />
              <span>{subCategories.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="items" className="container">
        <h2>Items</h2>
        <span className="items-underline"></span>
        <div className="items-container">
          {subCategoriesItem.map((item) => (
            <div className="items-container-item">
              <img src={item.image} />
              <h3>{item.name}</h3>
              <div>
                <span>${item.price}</span>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
