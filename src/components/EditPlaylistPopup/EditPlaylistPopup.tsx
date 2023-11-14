import styles from "./EditPlaylistPopup.module.scss";
import PopupWrapper from "components/PopupWrapper/PopupWrapper";
import IconClose from "components/Icons/IconClose";
import { FormEvent, useEffect, useState } from "react";
import { api } from "api";

export interface IEditPlaylistPopupData {
  id: string;
  name: string;
  description: string | undefined;
  imageUrl: string
}

interface IProps {
  playlistData: IEditPlaylistPopupData;
  onClose: () => void;
}

function EditPlaylistPopup({ playlistData, onClose }: IProps) {
  const [ name, setName ] = useState<string>("");
  const [ description, setDescription ] = useState<string | undefined>("");
  const [ imageUrl, setImageUrl ] = useState<string>();

  useEffect(() => {
    setName(playlistData.name);
    setDescription(playlistData.description);
    setImageUrl(playlistData.imageUrl);
  }, [ ]);

  function onNameChanged(e: FormEvent) {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  }

  function onDescriptionChanged(e: FormEvent) {
    const target = e.target as HTMLTextAreaElement;
    setDescription(target.value);
  }

  async function editPlaylist() {
    api.playlist.editPlaylist({
      playlistId: playlistData.id,
      name,
      description: description ?? undefined,
    });

    onClose();
  }

  return (
    <PopupWrapper>
      <div className={styles.editPlaylistPopup}>
        <header>
          <p className={styles.title}>Edit details</p>
          <div className={styles.close} onClick={onClose}>
            <IconClose />
          </div>
        </header>
        <main>
          <div className={styles.formContainer}>
            <div className={styles.imageContainer}>
              <img src={imageUrl} alt={name} />
            </div>

            <div className={styles.inputContainer}>
              <div>
                <input onInput={onNameChanged} type="text" value={name} />
              </div>
              <div>
                <input onInput={onDescriptionChanged} type="text" value={description} />
              </div>
            </div>
          </div>

          <button onClick={editPlaylist}>Save</button>
        </main>
      </div>
    </PopupWrapper>
  )
}

export default EditPlaylistPopup
