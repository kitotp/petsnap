import zipfile
import torch
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

img = Image.open("./dog.png").convert("RGB")
inp = test_transforms(img).unsqueeze(0)

model.eval()

classes = {
    1: "dog",
    2: "cat",
}

with torch.no_grad():
    output = model(inp)  # raw logits
    probs = torch.softmax(output, dim=1)
    max_val = torch.argmax(probs, dim=1).item()
    confidence = probs[0, max_val].item()

print("Class", classes[max_val], "with confidence: ", confidence)
