from .models import Produto
from .serializers import CreateProdutoSerializer
from rest_framework.viewsets import ModelViewSet

# Create your views here.

class CreateProdutoAPI(ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = CreateProdutoSerializer