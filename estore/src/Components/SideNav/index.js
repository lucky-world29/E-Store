import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../Redux/Category/actions";
import "./_side-nav.scss";

const SideNav = () => {

    const accordionData = useSelector(state => state.category.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div className="side-nav">

            <div className="section-title">
                <h3>Category</h3>
            </div>

            <div className="accordion" id="categoryAccordion">

                {accordionData.map((category, index) => (

                    <div className="accordion-item" key={category._id}>

                        <h2
                            className="accordion-header"
                            id={`heading${index}`}
                        >

                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="false"
                                aria-controls={`collapse${index}`}
                            >
                                {category.name}
                            </button>

                        </h2>

                        <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#categoryAccordion"
                        >

                            <div className="accordion-body">

                                No Sub Categories

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default SideNav;