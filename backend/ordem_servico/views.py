from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import OrdemServico, Patrimonio, Ambiente, Manutentor, Responsavel, Gestor, Historico
from .serializers import OrdemServicoSerializer, PatrimonioSerializer, AmbienteSerializer, ManutentorSerializer, ResponsavelSerializer, GestorSerializer, HistoricoSerializer

class OrdemServicoViewSet(viewsets.ModelViewSet):
    queryset = OrdemServico.objects.all()
    serializer_class = OrdemServicoSerializer
    permission_classes = [IsAuthenticated]

class PatrimonioViewSet(viewsets.ModelViewSet):
    queryset = Patrimonio.objects.all()
    serializer_class = PatrimonioSerializer
    permission_classes = [IsAuthenticated]

class AmbienteViewSet(viewsets.ModelViewSet):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]

class ManutentorViewSet(viewsets.ModelViewSet):
    queryset = Manutentor.objects.all()
    serializer_class = ManutentorSerializer
    permission_classes = [IsAuthenticated]

class ResponsavelViewSet(viewsets.ModelViewSet):
    queryset = Responsavel.objects.all()
    serializer_class = ResponsavelSerializer
    permission_classes = [IsAuthenticated]

class GestorViewSet(viewsets.ModelViewSet):
    queryset = Gestor.objects.all()
    serializer_class = GestorSerializer
    permission_classes = [IsAuthenticated]

class HistoricoViewSet(viewsets.ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]