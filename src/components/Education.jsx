import { useForm, useFieldArray } from "react-hook-form";
import "../styles/Education.css";

const Education = ({ onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: [
        {
          degree: "",
          institute: "",
          location: "",
          startYear: "",
          endYear: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data) => {
    console.log("Education:", data);
    onNext(data);
  };

  return (
    <div className="education-container">
      <div className="profile-header">
        <h2>Education</h2>
        <p>
          Details like course, university, and more, help recruiters identify
          your educational background
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        {fields.map((item, index) => (
          <div className="education-group form-group" key={item.id}>
            <div className="education-group-header">
              <h4>Education {index + 1}</h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => remove(index)}
                >
                  &times;
                </button>
              )}
            </div>

            <label>Degree</label>
            <select
              {...register(`education.${index}.degree`, { required: true })}
            >
              <option value="">Select degree</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              <option value="Diploma">Diploma</option>
            </select>
            {errors.education?.[index]?.degree && (
              <span className="error">Degree is required</span>
            )}

            <div className="input-row">
              <div className="input-column">
                <label>Institute name</label>
                <input
                  type="text"
                  {...register(`education.${index}.institute`, {
                    required: true,
                  })}
                  placeholder="Type your institute name"
                />
                {errors.education?.[index]?.institute && (
                  <span className="error">Institute name is required</span>
                )}
              </div>

              <div className="input-column">
                <label>Location</label>
                <input
                  type="text"
                  {...register(`education.${index}.location`, {
                    required: true,
                  })}
                  placeholder="City"
                />
                {errors.education?.[index]?.location && (
                  <span className="error">Location is required</span>
                )}
              </div>
            </div>

            <div className="input-row">
              <div className="input-column">
                <label>Start year</label>
                <select
                  {...register(`education.${index}.startYear`, {
                    required: true,
                  })}
                >
                  <option value="">Start year</option>
                  {Array.from({ length: 30 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="input-column">
                <label>End year</label>
                <select
                  {...register(`education.${index}.endYear`, {
                    required: true,
                  })}
                >
                  <option value="">End year</option>
                  {Array.from({ length: 30 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="add-btn"
          onClick={() =>
            append({
              degree: "",
              institute: "",
              location: "",
              startYear: "",
              endYear: "",
            })
          }
        >
          + Add education
        </button>

        <div className="navigation-buttons">
          <button type="button" className="back-btn" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="next-btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Education;
