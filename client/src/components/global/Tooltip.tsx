const Tooltip = ({ text }: { text: string }) => {
    return (
        <div className="z-50 w-full h-full absolute flex flex-col justify-end opacity-0 hover:opacity-100">
            <p className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 py-1.5 px-3 bg-black text-white text-xs font-medium rounded-md shadow-lg border border-white/10 transition-all duration-200 whitespace-nowrap">
                {text}
            </p>
        </div>
    );
};
export default Tooltip;
