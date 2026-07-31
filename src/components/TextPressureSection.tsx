import TextPressure from "./TextPressure";

export default function TextPressureSection() {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-white px-6">
      <div className="relative h-64 w-full max-w-5xl md:h-80">
        <TextPressure
          text="THRYVE!"
          flex
          alpha={false}
          stroke
          width
          weight
          italic={false}
          textColor="#000000"
          strokeColor="#7C3AED"
          minFontSize={36}
        />
      </div>
    </section>
  );
}
