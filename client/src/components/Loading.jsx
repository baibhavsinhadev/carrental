
const Loading = ({ height = "85vh" }) => {
    return (
        <div className={`${height === "85vh" ? "min-h-[85vh]" : "min-h-screen"} flex items-center justify-center`}>
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
};

export default Loading;