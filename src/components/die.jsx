export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld === true ? "#59E391" : "white",
  };
  return (
    <button
      className="border w-[50px]  md:w-[65px] h-[50px] rounded-md font-semibold text-xl shadow-lg transition hover:shadow-xl active:scale-95 ring-1 ring-white/10 border-none "
      onClick={() => props.Hold(props.id)}
      style={styles}
      aria-pressed={props.isHeld}
      title={props.isHeld ? "Held" : "Tap to hold"}
    >
      {props.value}
    </button>
  );
}
