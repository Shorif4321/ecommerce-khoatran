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
    const [ingredient, setIngredient] = useState([]);

    const subCategories = categories.map(categories => categories.sub_category);
    console.log(subCategories, 'from here');


    useEffect(() => {
        fetch("https://grocerywatch.herokuapp.com/market/data")
            .then((res) => res.json())
            .then((data) => setCategories(data.categories));
    }, []);


    // https://grocerywatch.herokuapp.com/market/data/



    if (!categories) {
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
                            className=""
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
                    <button
                        className=""
                    >
                        <img src="" />
                        <span>Button will be show</span>
                    </button>

                </div>
            </section>



            <section id="items" className="container">
                <h2>Items</h2>
                <span className="items-underline"></span>
                <div className="items-container">

                    <div className="items-container-item" >
                        <img src="" />
                        <h3>Rroduct</h3>
                        <div>
                            <span>$24,10</span>
                            <button>Add to cart</button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Home;
