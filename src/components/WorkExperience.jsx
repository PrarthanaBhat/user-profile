import { useForm } from "react-hook-form";
import { useState } from "react";
import '../styles/WorkExperience.css';

const WorkExperience = ({ onNext, onBack }) => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isFresher, setIsFresher] = useState(false);

  const onSubmit = (data) => {
    console.log('Work Experience:', data);
    onNext();
  };

  const jobProfileValue = watch("jobProfile", "");

  return (
    <div className="profile-setup-container">
      <div className="profile-header">
        <h2 className="profile-title">Work experience</h2>
        <p className="profile-subtitle">
          Details like job title, company name, etc., help employers understand your work
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-layout">
       
        <div className="form-group full-width">
          <label>Are you a fresher?*</label>
          <div className="toggle-buttons">
            <button
              type="button"
              className={isFresher ? "active" : ""}
              onClick={() => setIsFresher(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={!isFresher ? "active" : ""}
              onClick={() => setIsFresher(false)}
            >
              No
            </button>
          </div>
        </div>

        {!isFresher && (
    <>
      <div className="form-row">
        <div className="form-group">
          <label>Total experience*</label>
          <select {...register("expYears", { required: "Year required" })}>
            <option value="">Select year</option>
            {[...Array(21)].map((_, i) => (
              <option key={i} value={i}>{i} year</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>&nbsp;</label>
          <select {...register("expMonths", { required: "Month required" })}>
            <option value="">Select month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i}>{i} month</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Current company name*</label>
          <input {...register("company", { required: "Company name required" })} placeholder="Type your organisation" />
          {errors.company && <span className="error">{errors.company.message}</span>}
        </div>

        <div className="form-group">
          <label>Current job title*</label>
          <input {...register("designation", { required: "Job title required" })} placeholder="Type your designation" />
          {errors.designation && <span className="error">{errors.designation.message}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Joining year*</label>
          <select {...register("joinYear", { required: "Year required" })}>
            <option value="">Select year</option>
            {[...Array(25)].map((_, i) => {
              const year = new Date().getFullYear() - i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </div>

        <div className="form-group">
          <label>Joining month*</label>
          <select {...register("joinMonth", { required: "Month required" })}>
            <option value="">Select month</option>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
              .map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <label>Notice period*</label>
        <select {...register("notice", { required: "Notice required" })}>
          <option value="">Select notice period</option>
          <option value="Immediate">Immediate</option>
          <option value="15 Days">15 Days</option>
          <option value="1 Month">1 Month</option>
          <option value="2 Months">2 Months</option>
          <option value="3 Months">3 Months</option>
        </select>
        {errors.notice && <span className="error">{errors.notice.message}</span>}
      </div>

      <div className="form-group full-width">
        <label>Job profile</label>
        <textarea {...register("jobProfile")} placeholder="Type here" maxLength={200}></textarea>
        <div className="char-count">{jobProfileValue.length}/200</div>
      </div>
    </>
  )}

<div className="form-actions full-width">
  <button type="button" className="back-btn" onClick={onBack}>Back</button>
  <button type="submit" className="next-btn">Next</button>
</div>
</form>
    </div>
  );
};

export default WorkExperience;
