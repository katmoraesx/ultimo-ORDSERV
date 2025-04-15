# ordem_servico/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrdemServicoViewSet, PatrimonioViewSet, AmbienteViewSet, ManutentorViewSet, ResponsavelViewSet, GestorViewSet, HistoricoViewSet

router = DefaultRouter()
router.register(r'ordem-servico', OrdemServicoViewSet)
router.register(r'patrimonio', PatrimonioViewSet)
router.register(r'ambiente', AmbienteViewSet)
router.register(r'manutentor', ManutentorViewSet)
router.register(r'responsavel', ResponsavelViewSet)
router.register(r'gestor', GestorViewSet)
router.register(r'historico', HistoricoViewSet)

urlpatterns = [
    path('data/', include(router.urls)),
]
