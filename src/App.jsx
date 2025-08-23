import { useMemo, useRef, useState } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function App() {

  const nameRef = useRef();
  const specializationRef = useRef();
  const yearsExperienceRef = useRef();

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(
    {
      username: "",
      password: "",
      description: ""
    }
  )


  const isUsernameValid = useMemo(() => {
    return (
      formData.username.split("").every(char =>
        letters.includes(char.toLowerCase()) ||
        numbers.includes(char)) &&
      formData.username.trim().length >= 6
    )
  }, [formData.username])

  const isPasswordValid = useMemo(() => {
    return (
      formData.password.split("").some(char => letters.includes(char.toLowerCase())) &&
      formData.password.split("").some(char => numbers.includes(char)) &&
      formData.password.split("").some(char => symbols.includes(char)) &&
      formData.password.trim().length >= 8
    )
  }, [formData.password])

  const isDescriptionValid = useMemo(() => {
    return (
      formData.description.trim().length >= 5 &&
      formData.description.trim().length < 1000
    )
  }, [formData.description])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanedData = {
      name: nameRef.current.value.trim(),
      specialization: specializationRef.current.value.trim(),
      yearsExperience: yearsExperienceRef.current.value,
      username: formData.username.trim(),
      password: formData.password.trim(),
      description: formData.description.trim()
    };

    if (
      !cleanedData.name ||
      !cleanedData.username ||
      !cleanedData.password ||
      !cleanedData.specialization ||
      cleanedData.yearsExperience < 0 ||
      !cleanedData.description ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
      console.error("Tutti i campi devono essere compilati");
      return;
    }

    console.log("Campi inviati con successo", cleanedData);

    // reset refs manualmente
    nameRef.current.value = "";
    specializationRef.current.value = "";
    yearsExperienceRef.current.value = "";

    // reset campi controllati
    setFormData({
      username: "",
      password: "",
      description: ""
    });
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
            ref={nameRef}
          />
        </div>

        {/* USERNAME */}
        <div className="mb-3">
          <label htmlFor="formUsername" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="formUsername"
            placeholder="Wraite your usurname..."
            autoComplete="family-name"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {formData.username.trim() &&
            (<p className={!isUsernameValid ? "text-danger" : "text-success"}>
              {isUsernameValid ? "Username valid" : "Deve avere almeno 6 caratteri alfanumerici"}
            </p>)}
        </div>

        {/* PASSWORD */}
        <div className="mb-3 position-relative">
          <label htmlFor="formPassword" className="form-label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="formPassword"
            placeholder="Wraite your password..."
            //autoComplete="new-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "38px",
              cursor: "pointer",
              color: "#6c757d",
            }}
          >
            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </span>
          {formData.password.trim() &&
            (<p className={!isPasswordValid ? "text-danger" : "text-success"}>
              {isPasswordValid ? "Password valid" : "Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo"}
            </p>)}
        </div>

        {/* SPECIALIZATION */}
        <div className="mb-3">
          <label htmlFor="formSpecialization" className="form-label">Specialization</label>
          <select
            className="form-select"
            id="formSpecialization"
            name="specialization"
            ref={specializationRef}
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
            ref={yearsExperienceRef}
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
          {formData.description.trim() &&
            (<p className={!isDescriptionValid ? "text-danger" : "text-success"}>
              {isDescriptionValid ? "Description valid" : `Deve contenere tra 100 e 1000 caratteri (${formData.description.length})`}
            </p>)}
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form >


    </div >
  )
}

export default App
