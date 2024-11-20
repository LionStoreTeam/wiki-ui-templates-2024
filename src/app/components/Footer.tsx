const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <div className="w-full py-3 flex justify-center items-center bg-black  bottom-0">
            <h1 className="text-pink-200">Copyright &copy;{" "}{currentYear} {" "} Wiki UI.</h1>
        </div>
    );
}

export default Footer;

