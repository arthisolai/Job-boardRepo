import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

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

export default function Header() {
  return (
    <StyledHeader>
      <div className="logo">
        <Image
          src="/path/to/your/logo.png"
          alt="Site Logo"
          width={50}
          height={50}
        />
      </div>
      <nav>
        <StyledUl style={{ display: "flex", flexDirection: "row" }}>
          <StyledLi>
            <Link href="/">Home</Link>
          </StyledLi>
          <StyledLi>
            <Link href="/Jobs">Jobs</Link>
          </StyledLi>
          <StyledLi>
            <Link href="/Country">Country</Link>
          </StyledLi>
          <StyledLi>
            <Link href="/Calculators">Calculator</Link>
          </StyledLi>
          <StyledLi>
            <Link href="/Resources">Resources</Link>
          </StyledLi>
          <StyledLi>
            <button>Add Company</button>
          </StyledLi>
        </StyledUl>
      </nav>
    </StyledHeader>
  );
}
