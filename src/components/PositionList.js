import React, { useState } from "react";
import Add from "../containers/AddButtonContainer";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/outline";

function PositionsList({ positions }) {
  const [expandedPositions, setExpandedPositions] = useState([]);

  const handleExpand = (positionId) => {
    setExpandedPositions((prevExpanded) =>
      prevExpanded.includes(positionId)
        ? prevExpanded.filter((id) => id !== positionId)
        : [...prevExpanded, positionId]
    );
  };

  const renderTreeNodes = (data, parentId = null) => {
    return data
      .filter((position) => position.parentId === parentId)
      .map((position, index) => {
        const hasChildren = positions.some(
          (pos) => pos.parentId === position.id
        );
        const isExpanded = expandedPositions.includes(position.id);

        return (
          <div
            key={position.id}
            style={{
              transitionDelay: `${index + 3}00ms`,
            }}
            className={`mb-2 whitespace-pre duration-500 ${
              !expandedPositions.includes(position.id) &&
              "opacity-100 translate-x-4 overflow-hidden"
            }`}
          >
            <button className="mt-1 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gray-300 dark:bg-gray-800 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
              <Link
                to={`/positions/${position.id}`}
                className="relative px-5 py-2.5 transition-all ease-in duration-75 font-san font-bold text-lg bg-green-400 dark:bg-green-700 rounded-md group-hover:bg-opacity-0"
              >
                {position.name}
              </Link>
            </button>
            {hasChildren && (
              <button
                onClick={() => handleExpand(position.id)}
                className="ml-4 text-gray-900 font-serif font-bold hover:text-white hover:bg-slate-500 border-spacing-10 transition-colors duration-300"
              >
                <ChevronDownIcon
                  className={`h-6 w-6 transform ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  } transition-transform duration-300`}
                />
              </button>
            )}
            {isExpanded && hasChildren && (
              <div
                style={{
                  transitionDelay: `${index + 3}00ms`,
                }}
                className={`ml-5 whitespace-pre duration-500 ${
                  !expandedPositions.includes(position.id) &&
                  "opacity-100 translate-x-4 overflow-hidden"
                }`}
              >
                {renderTreeNodes(positions, position.id)}
              </div>
            )}
          </div>
        );
      });
  };

  return (
    <div className="">
      <div>
        {positions
          ?.filter((position) => !position.parentId)
          .map((position, index) => (
            <div
              key={position.id}
              className="ml-10 text-3xl transition-transform duration-1000"
            >
              <button className="mt-2 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gray-300 dark:bg-gray-800 hover:text-white dark:text-white ">
                <Link
                  to={`/positions/${position.id}`}
                  className="relative px-5 py-2.5 transition-all ease-in duration-700 font-san font-bold text-lg bg-gray-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                >
                  {position.name}
                </Link>
              </button>
              {position.parentId === "" && (
                <button
                  onClick={() => handleExpand(position.id)}
                  className="ml-4 text-gray-900 font-serif font-bold hover:text-white hover:bg-slate-500 border-spacing-10 transition-colors duration-300"
                >
                  <ChevronDownIcon
                    className={`h-6 w-6 transform ${
                      expandedPositions.includes(position.id)
                        ? "rotate-180"
                        : "rotate-0"
                    } transition-transform duration-300`}
                  />
                </button>
              )}
              {expandedPositions.includes(position.id) && (
                <div
                  style={{
                    transitionDelay: `${index + 3}00ms`,
                  }}
                  className={`ml-5 whitespace-pre duration-500 ${
                    expandedPositions.includes(position.id) &&
                    "opacity-100 translate-y-4 overflow-hidden"
                  }`}
                >
                  {console.log(position+index)}
                  {renderTreeNodes(positions, position.id)}
                </div>
              )}
            </div>
          ))}
      </div>
      <Add />
    </div>
  );
}

export default PositionsList;
