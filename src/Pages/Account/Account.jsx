import React, { useState } from "react";
import { deleteUser, updateUser } from "../../Api/User.jsx";
import { useAuthContext } from "../../Hooks/useAuthContext.jsx";
import { toast } from "react-toastify";
import { ImUpload3, ImArrowRight } from "react-icons/im";
import "./Account.scss";

const Account = () => {
  const { dispatch, user } = useAuthContext();
  const [firstname, setFirstname] = useState(user.firstName);
  const [lastname, setLastname] = useState(user.lastName);
  const [dateofbirth, setDateofbirth] = useState(user.dateofBirth);
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState(null);
  const createdAt = new Date(user.createdAt).toLocaleDateString("fr");

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    readImg(file);

    if (file) {
      setFile(e.target.files[0]);
    } else {
      setFile("");
    }
  };
  // console.log(file);

  const readImg = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
    } else {
      setAvatar("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("dateofbirth", dateofbirth);
    data.append("avatar", file);

    const newInfos = await updateUser(data, user._id);
    // console.log(newInfos);
    dispatch({ type: "UPDATE_USER", payload: newInfos.newInfos });
    toast.success(newInfos.message);

    console.log(firstname, lastname, dateofbirth);

    setAvatar("");
  };

  const deleteAccount = async () => {
    if (
      window.confirm(
        `${user.firstName}, Etes vous sur de vouloir supprimer votre compte ?`
      )
    ) {
      const remove = await deleteUser(user._id);
      window.location.reload();
      toast.success(`${remove.message}, en espérant vous revoir bientot !`);
    }
  };

  return (
    <div className="Account">
      <div className="Account__title">
        <h1>Bonjour, {user.firstName + " " + user.lastName}</h1>
        <h3>Membre depuis le {createdAt}</h3>
      </div>

      <form
        className="Account__form"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <div className="Account__group">
          <label htmlFor="avatar">Avatar</label>
          <div className="avatar">
            <img
              src={user.avatar}
              alt={`${user.firstName} avatar`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            {avatar && (
              <>
                <div className="separator">
                  <ImArrowRight size={30} color="#ffff" />
                  <p>Votre photo actuelle sera changé en</p>
                </div>
                <img
                  src={avatar}
                  alt={`${avatar} preview`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </>
            )}
          </div>
          {/* <input type="file" onChange={handleImgUpload} name="avatar" /> */}
        </div>
        <div className="Account__file-input">
          <label className="file-input__label" htmlFor="file-input">
            <ImUpload3 />
            <span>Photo de profil</span>
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            className="file-input__input"
            accept="image/"
            onChange={handleImgUpload}
            required
          />
        </div>
        <div className="Account__group">
          <label htmlFor="firstname">Prénom</label>
          <input
            name="firstname"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="Account__group">
          <label htmlFor="lastname">Nom</label>
          <input
            name="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="Account__group">
          <label htmlFor="dateofbirth">Date de Naissance</label>
          <input
            name="dateofbirth"
            type="date"
            value={dateofbirth}
            onChange={(e) => setDateofbirth(e.target.value)}
          />
        </div>
        <div className="Account__bottom">
          <button type="submit" onClick={onSubmit}>
            Sauvegarder
          </button>
        </div>
      </form>
      <div className="Account__removed">
        <button onClick={deleteAccount}>Supprimer mon compte</button>
      </div>
    </div>
  );
};

export default Account;
