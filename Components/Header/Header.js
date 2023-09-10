import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import AddCompanyForm from "../AddCompany/AddCompanyForm";
import Modal from "../Modal/Modal";
import { useState } from "react";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 96%;
  z-index: 100;
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLogo = styled.div`
  margin-right: 20px;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

const StyledLi = styled.li`
  margin-right: 20px;
`;

const StyledLink = styled.div`
  text-decoration: none;
  font-size: 16px;
  color: #333;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #000;
    transition: width 0.3s ease;
  }

  &.active {
    color: #000;

    &::before {
      width: 100%;
    }
  }
`;

export default function Header({ onSearch }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleSearch = (event) => {
    const query = event.target.value;
    console.log("Search Query:", query);
    onSearch(query);
  };

  return (
    <header className="flex items-center justify-between p-4">
      {/* <div className="logo">
        <Image src="/logo.png" alt="Site Logo" width={50} height={50} />
      </div> */}
      <div className="p-4">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative w-96">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for your next job..."
            required
            onChange={handleSearch}
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search for your next job..."
          onChange={handleSearch}
        />
      </div> */}
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/Jobs"
              className="cursor-pointer hover:text-blue-500 transition duration-300"
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              href="/Company"
              className="cursor-pointer hover:text-blue-500 transition duration-300"
            >
              Company
            </Link>
          </li>
          <li>
            <Link
              href="/Calculators"
              className="cursor-pointer hover:text-blue-500 transition duration-300"
            >
              Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/Resources"
              className="cursor-pointer hover:text-blue-500 transition duration-300"
            >
              Resources
            </Link>
          </li>
          <li>
            <button
              onClick={toggleModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add Company
            </button>
          </li>
          <Modal show={showModal} onClose={toggleModal}>
            <AddCompanyForm />
          </Modal>
        </ul>
      </nav>
    </header>
  );
}
