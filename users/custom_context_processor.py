from users.models import Address

def addresses(request):
    return { 'addresses':Address.objects.filter(user=request.user)}
