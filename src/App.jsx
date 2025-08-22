import { useState } from "react";

function App() {

  const [formData, setFormData] = useState(
    {
      name: "",
      usurname: "",
      password: "",
      specialization: "",
      yearsExperience: 0,
      description: ""
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanedData = {
      name: formData.name.trim(),
      usurname: formData.usurname.trim(),
      password: formData.password.trim(),
      specialization: formData.specialization.trim(),
      yearsExperience: formData.yearsExperience,
      description: formData.description.trim(),
    };

    if (
      !cleanedData.name ||
      !cleanedData.usurname ||
      !cleanedData.password ||
      !cleanedData.specialization ||
      cleanedData.yearsExperience < 0 ||
      !cleanedData.description
    ) {
      console.error("Tutti i campi devono essere compilati");
      return
    }
    console.log(`campi inviati con successo`, cleanedData);
    setFormData({
      name: "",
      usurname: "",
      password: "",
      specialization: "",
      yearsExperience: 0,
      description: ""
    })

  };

  console.log(formData);



  return (
    <div className="container">

      <h1 className="text-center mb-4">Registration</h1>

      <form className="form-control" onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="mb-3">
          <label htmlFor="formName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="formName"
            placeholder="Wraite your name..."
            autoComplete="given-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* USURNAME */}
        <div className="mb-3">
          <label htmlFor="formUsurname" className="form-label">Usurname</label>
          <input
            type="text"
            className="form-control"
            id="exampleForformUsurnamemControlInput1"
            placeholder="Wraite your usurname..."
            autoComplete="family-name"
            name="usurname"
            value={formData.usurname}
            onChange={handleChange}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <label htmlFor="formPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="formPassword"
            placeholder="Wraite your password..."
            autoComplete="new-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* SPECIALIZATION */}
        <div className="mb-3">
          <label htmlFor="formSpecialization" className="form-label">Specialization</label>
          <select
            className="form-select"
            id="formSpecialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          >
            <option value="">Select field</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>


        {/* YEARS EXPERIENCE */}
        <div className="mb-3">
          <label htmlFor="formYearsExperience" className="form-label">Years experience</label>
          <input
            type="number"
            className="form-control"
            id="formYearsExperience"
            name="yearsExperience"
            value={formData.yearsExperience}
            onChange={handleChange}
          />
        </div>

        {/* DESCIPTION */}
        <div className="mb-3">
          <label htmlFor="formDescription" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="formDescription"
            rows="3"
            placeholder="Wraite..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          >
          </textarea>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form >


    </div >
  )
}

export default App
