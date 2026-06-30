from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib
from pathlib import Path

app = Flask(
    __name__,
    template_folder="../templates",
    static_folder="../static"
)