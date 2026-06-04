"use client";

export default function Profile() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Profile</h1>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <h3>Email</h3>
        <p>test@test.com</p>

        <h3>Total Resumes</h3>
        <p>3</p>

        <h3>Latest Goal</h3>
        <p>Software Engineer</p>
      </div>
    </main>
  );
}