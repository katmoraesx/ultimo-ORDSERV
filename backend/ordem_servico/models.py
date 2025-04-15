# ordem_servico/models.py

from django.db import models

class OrdemServico(models.Model):
    STATUS_CHOICES = [
        ('iniciada', 'Iniciada'),
        ('em andamento', 'Em Andamento'),
        ('finalizada', 'Finalizada'),
        ('cancelada', 'Cancelada'),
    ]

    PRIORIDADE_CHOICES = [
        ('alta', 'Alta'),
        ('media', 'Média'),
        ('baixa', 'Baixa'),
    ]

    descricao = models.TextField()
    abertura = models.DateTimeField(auto_now_add=True)
    fechamento = models.DateTimeField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=20)
    patrimonio = models.ForeignKey('Patrimonio', null=True, blank=True, on_delete=models.SET_NULL)
    ambiente = models.ForeignKey('Ambiente', on_delete=models.CASCADE)
    manutentor = models.ForeignKey('Manutentor', on_delete=models.CASCADE)
    responsavel = models.ForeignKey('Responsavel', null=True, blank=True, on_delete=models.SET_NULL)
    prioridade = models.CharField(choices=PRIORIDADE_CHOICES, max_length=20)

    def __str__(self):
        return f'OS {self.id} - {self.descricao}'


class Patrimonio(models.Model):
    ni = models.CharField(max_length=20)
    descricao = models.TextField()
    localizacao = models.CharField(max_length=100)

    def __str__(self):
        return self.ni


class Ambiente(models.Model):
    ni = models.CharField(max_length=20)
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Manutentor(models.Model):
    ni = models.CharField(max_length=20)
    nome = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    gestor = models.ForeignKey('Gestor', on_delete=models.CASCADE)

    def __str__(self):
        return self.nome


class Responsavel(models.Model):
    ni = models.CharField(max_length=20)
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Gestor(models.Model):
    ni = models.CharField(max_length=20)
    nome = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Historico(models.Model):
    ordem = models.ForeignKey('OrdemServico', on_delete=models.SET_NULL, null=True, blank=True)
    data_encerramento = models.DateTimeField()