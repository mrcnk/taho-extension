import React, { useState } from "react"
import SharedInput from "../../../../components/Shared/SharedInput"
import SharedButton from "../../../../components/Shared/SharedButton"
import { useGridPlus } from "./GridPlus"
import { useBackgroundDispatch } from "../../../../hooks"
import { connectGridplus } from "@tallyho/tally-background/redux-slices/gridplus"

export default function GridPlusCredentials() {
  const dispatch = useBackgroundDispatch()
  const [formData, setFormData] = useState({ deviceId: "", password: "" })
  const { onSignedIn } = useGridPlus()
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const permitted = await dispatch(
      connectGridplus({
        deviceId: formData.deviceId,
        password: formData.password,
      }),
    )
    onSignedIn(permitted)
  }
  return (
    <form onSubmit={onSubmit} className="form-container">
      <header>
        <h1>Connect your Lattice1</h1>
        <p>Connect your Lattice1 to Taho using the Connection Wizard.</p>
      </header>
      <div>
        <SharedInput
          id="deviceId"
          label="Device ID"
          warningMessage="Located on device's home screen."
          value={formData.deviceId}
          onChange={(value) => setFormData({ ...formData, deviceId: value })}
        />
      </div>
      <div>
        <SharedInput
          id="password"
          type="password"
          label="GridPlus Password"
          warningMessage="If this is your first time logging in, create a new password."
          value={formData.password}
          onChange={(value) => setFormData({ ...formData, password: value })}
        />
      </div>
      <SharedButton id="formSubmit" isFormSubmit type="primary" size="large">
        Connect
      </SharedButton>
    </form>
  )
}
