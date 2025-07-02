import { useForm, useFieldArray } from "react-hook-form";
import { useMemo } from "react";
import "../styles/Education.css";
import { useDispatch, useSelector } from "react-redux";
import { updateEducation } from "../slices/profileSlice";

const Education = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.profile.education);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      education: education.length
        ? education
        : [
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

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 30 }, (_, i) => currentYear - i);
  }, []);

  const newEducationEntry = {
    degree: "",
    institute: "",
    location: "",
    startYear: "",
    endYear: "",
  };

  const onBackClick = () => {
    dispatch(updateEducation(getValues().education)); 
    onBack();
  };

  const onSubmit = (data) => {
    dispatch(updateEducation(data.education)); 
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
                  aria-label={`Remove Education ${index + 1}`}
                >
                  &times;
                </button>
              )}
            </div>

            <label htmlFor={`degree-${index}`}>Degree</label>
            <select
              id={`degree-${index}`}
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
                <label htmlFor={`institute-${index}`}>Institute name</label>
                <input
                  id={`institute-${index}`}
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
                <label htmlFor={`location-${index}`}>Location</label>
                <input
                  id={`location-${index}`}
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
                <label htmlFor={`startYear-${index}`}>Start year</label>
                <select
                  id={`startYear-${index}`}
                  {...register(`education.${index}.startYear`, {
                    required: "Start year is required",
                  })}
                >
                  <option value="">Start year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.education?.[index]?.startYear && (
                  <span className="error">
                    {errors.education[index].startYear.message}
                  </span>
                )}
              </div>

              <div className="input-column">
                <label htmlFor={`endYear-${index}`}>End year</label>
                <select
                  id={`endYear-${index}`}
                  {...register(`education.${index}.endYear`, {
                    required: "End year is required",
                    validate: (endYear, values) => {
                      const startYear = values.education?.[index]?.startYear;
                      if (!startYear || !endYear) return true;
                      return (
                        parseInt(endYear) >= parseInt(startYear) ||
                        "End year cannot be before Start year"
                      );
                    },
                  })}
                >
                  <option value="">End year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.education?.[index]?.endYear && (
                  <span className="error">
                    {errors.education[index].endYear.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="add-btn"
          onClick={() => append(newEducationEntry)}
        >
          + Add education
        </button>

        <div className="navigation-buttons">
          <button type="button" className="back-btn" onClick={onBackClick}>
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
