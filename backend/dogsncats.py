import zipfile
import torch
import io
from torch import nn
from torchvision import transforms, datasets, models
from PIL import Image

test_transforms = transforms.Compose(
    [
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
    ]
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = models.resnet18(pretrained=True)

fc_infeatures = model.fc.in_features
model.fc = nn.Linear(fc_infeatures, 2)

checkpoint = torch.load("resnet18_finetuned.pth", map_location="cpu")
model.load_state_dict(checkpoint)
model.to(device).eval()

idx2class = {0: "cat", 1: "dog"}  

def predict_img(image: bytes) -> dict:
    img = Image.open(io.BytesIO(image)).convert('RGB')
    inp = test_transforms(img).unsqueeze(0)
    output = model(inp)  # raw logits
    probs = torch.softmax(output, dim=1)
    max_val = torch.argmax(probs, dim=1).item()
    return {
        'class': idx2class[max_val],
        'confidence': float(probs[0, max_val])
    }

