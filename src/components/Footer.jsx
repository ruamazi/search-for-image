const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        API and this Webpage Created By <span>Mohssin Aoulad</span>
      </p>
      <p>© {currentYear} - All Rights Reserved. </p>
    </footer>
  );
};

export default Footer;
