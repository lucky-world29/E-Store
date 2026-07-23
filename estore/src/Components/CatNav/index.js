import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/Category/actions';
import { Link } from "react-router-dom";
import './_cat-nav.scss';


const CatNav = () => {
    // Static array of categories
    const categories = useSelector(
        state => state.category.categories
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <>
            <div className='cat-nav-container container'>
                <ul>
                    {
                        categories.map((category) => {
                            return (
                                <li key={category._id} className="list-items">
                                    {/* <a href="#">{category.name}</a> */}
                                    <Link to={`/category/${category.slug}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            );
                        })
                    }

                </ul>
            </div>
        </>
    )
}

export default CatNav;