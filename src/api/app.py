from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib
from pathlib import Path