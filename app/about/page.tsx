export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section aria-labelledby="about-heading">
      <h1 id="about-heading">About this project</h1>
      <p><strong>Name:</strong> Cong Chinh Phan</p>
      <p><strong>Student number:</strong> 21405057</p>
      <p>
        This site demonstrates an accessible UI and a code generator that emits a standalone HTML file
        with inline CSS only (no classes) and vanilla JS. It was created the old‑fashioned way and meets
        the Assignment 1 requirements.
      </p>

      <h2>How to use (short video)</h2>
      <p>Replace the video source below with your own 3–8 minute walkthrough (face + screen + audio).</p>
      <video controls width={720} poster="" style={{ maxWidth: "100%" }}>
        <source src="\public\Assignment.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
