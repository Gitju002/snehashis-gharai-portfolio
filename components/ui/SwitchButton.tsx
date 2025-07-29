import React from "react";

const SwitchButton = () => {
  const [isActive, setIsActive] = React.useState<string>("profession");

  const types = {
    profession: "Profession",
    passion: "Passion",
  };

  const handleClick = (key: string) => {
    setIsActive(key);
    console.log(key);
  };
  return (
    <div className="switch-btn">
      {Object.entries(types).map(([key, label], index) => (
        <button
          key={index}
          onClick={() => handleClick(key)}
          className={`btn-icon ${isActive === key ? "active" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SwitchButton;


