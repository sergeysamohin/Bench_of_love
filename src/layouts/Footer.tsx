import { Link } from "react-router";

export function Footer() {
    return (
        <footer
            className="text-extra bg-primary-dim
        uppercase pt-3 pb-3 mt-auto">
            <div className="flex gap-6 m-auto items-center w-fit mx-auto">
                <h1 className="text-sm">&#169; 2024 Bench Of Love</h1>
                <Link to="https://t.me/tima_deg44" target="_blank">DEGTIAROV INTERTAINMENT</Link>
            </div>
        </footer>
    );
}