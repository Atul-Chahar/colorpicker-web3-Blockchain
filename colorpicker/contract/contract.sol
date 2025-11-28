// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ColorPicker {
    // Stores the currently selected color (e.g. "#FF0000" or "red")
    string private currentColor;

    // Emitted whenever someone changes the color
    event ColorChanged(address indexed by, string newColor);

    // No constructor parameters → no inputs during deployment
    constructor() {
        // Optional: set a default color
        currentColor = "#FFFFFF"; // white
    }

    // Change the color
    function setColor(string calldata _color) external {
        currentColor = _color;
        emit ColorChanged(msg.sender, _color);
    }

    // Read the current color
    function getColor() external view returns (string memory) {
        return currentColor;
    }
}
