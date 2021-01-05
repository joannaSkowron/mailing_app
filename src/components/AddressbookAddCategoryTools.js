import React from 'react';
import '../styles/components/AddressbookAddCategoryTools.css';

const AddressbookAddCategoryTools = (props) => {

  const categories = ['All', 'Personal', 'Work', 'School'];

  const renderCategories = () => {
    return categories.map(category => {
      return (
        <div
          key={category}
          className={props.category === category
            ? "addressbook-add-tools-category active"
            : "addressbook-add-tools-category"}
          onClick={() => props.setCategory(category)}
        >{category}
        </div>
      )
    })
  }

  return (

    <div className="addressbook-add-tools-container">

      <div className="addressbook-add-tools-category-container" title="Set category">
        <p>Category:</p>
        {renderCategories()}
      </div>

      <div className="addressbook-add-tools-favourite"
        title={props.isFavourite ? "Remove from favourites" : "Add to favourites"}
        onClick={props.toggleIsFavourite}>
        <i className={props.isFavourite ? "fa fa-heart active" : "far fa-heart"}
        ></i>
      </div>

    </div>

  );
}

export default AddressbookAddCategoryTools;