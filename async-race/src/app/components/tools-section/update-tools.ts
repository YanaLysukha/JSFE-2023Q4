import Component from "../base-component";
import ButtonComponent from "../button/button";
import ColorUpdateComponent from "./color-update";
import "./tools.css";
import NameUpdateComponent from "./update-name";
import Api from "../../api";
import { ICar } from "../../../types/interfaces";

export default class UpdateFormComponent extends Component {
    updateColorInput = new ColorUpdateComponent();

    updateCarInput = new NameUpdateComponent();

    updateBtn = new ButtonComponent("update-btn", "update");

    constructor() {
        super({
            tagName: "section",
            className: "update-tools-section",
        });
        this.append(this.updateCarInput);
        this.append(this.updateColorInput);
        this.append(this.updateBtn);
    }

    addCarToUpdateForm(car: ICar) {
        const inputValue = car.name;
        (this.updateCarInput.node as HTMLInputElement).value = inputValue;
        (this.updateColorInput.node as HTMLInputElement).value = car.color;
    }

    static addListenerToUpdateBtn(
        updateBtn: Component,
        updateCarInput: Component<HTMLInputElement>,
        updateColorInput: Component<HTMLInputElement>,
        id: number,
    ) {
        updateBtn.node.addEventListener("click", async () => {
            const textInputValue = updateCarInput.node.value;
            const colorInputValue = updateColorInput.node.value;
            await Api.updateCar(id, textInputValue, colorInputValue);
        });
    }
}
