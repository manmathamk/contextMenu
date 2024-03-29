import React, { useState } from "react";

const Dropdown = ({ x, y, options, setOptions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [active, setActive] = useState(false);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filter options based on the search term
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleItemClick = (option) => {
    // Handle item click here, e.g., close dropdown, select option, etc.
    console.log("Selected Option:", option);
  };

  const handleTextChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div
      className="absolute z-10 bg-white lg:w-[20%] md:w-full sm:w-full p-3"
      style={{ left: x, top: y - 50 }}
    >
      <div className="flex items-center border border-gray-300 text-[#cbcbcb] rounded-md px-3 bg-[#333] py-2">
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full bg-[#333] text-[#cbcbcb]"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <img
          src={`/images/${searchTerm ? "Frame.png" : "chevron-down.png"}`}
          alt="Icon"
          className="ml-2 h-6 w-6"
          onClick={() => setActive(!active)}
        />
      </div>
      {active || searchTerm ? (
        <>
          <ul className="mt-2 border rounded shadow-md bg-[#1f1f1f] text-[#cbcbcb] text-sm">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`py-3 dropItem px-8 cursor-pointer ${
                  option === "Disabled option"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (option !== "Disabled option") handleItemClick(option);
                }}
              >
                {option === "Selected Option" && (
                  <span className="mr-2">&#10003;</span>
                )}
                {option === "Text option" ? (
                  <input
                    type="text"
                    value={options[index]}
                    className="bg-transparent outline-none"
                    onChange={(e) => handleTextChange(index, e.target.value)}
                  />
                ) : option === "Icon and text option" ? (
                  <span className="ml-2 flex">
                    <img
                      src="/images/movie.png"
                      alt="Icon"
                      className="h-4 w-4"
                    />
                    &nbsp;{option}
                  </span>
                ) : (
                  option
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const DropdownMenu = () => {
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([
    "Selected Option",
    "Default option",
    "Hovered option",
    "Disabled option",
    "Text option",
    "Icon and text option",
  ]);

  const handleDocumentClick = (event) => {
    event.preventDefault();
    const dropdownY = event.clientY + 10; // You can adjust the offset as needed

    setDropdownPosition({ x: event.clientX, y: dropdownY });
    setShowDropdown(true);
  };

  React.useEffect(() => {
    document.addEventListener("contextmenu", handleDocumentClick);

    return () => {
      document.removeEventListener("contextmenu", handleDocumentClick);
    };
  }, []);

  return (
    <div className="relative h-screen flex justify-center items-center">
      {showDropdown && (
        <Dropdown
          x={dropdownPosition.x}
          y={dropdownPosition.y}
          options={options}
          setOptions={setOptions}
        />
      )}
    </div>
  );
};

export default DropdownMenu;
