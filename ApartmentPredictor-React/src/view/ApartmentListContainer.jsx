import ApartmentItem from "./ApartmentItem";

const ApartmentListContainer = ({ apartments, onDetail, onUpdate, onDelete, isDeleting }) => {
  return (
    <ul className="apartment-list">
      {// Map through apartments and display their details
      // Each apartment is rendered as a list item with key as apartment.id
      // The details include price, area, bedrooms, bathrooms, stories, and features
      }
      {apartments.map((apartment) => (
        <ApartmentItem
          key={apartment.id}
          apartment={apartment}
          onDetail={onDetail}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </ul>
  );
};

export default ApartmentListContainer;
