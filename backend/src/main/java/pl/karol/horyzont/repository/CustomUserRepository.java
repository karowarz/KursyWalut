package pl.karol.horyzont.repository;

public interface CustomUserRepository {
    void partialUpdate(final String userId, final String fieldName, final Object fieldValue);
    public String findUsersCurrency(final String userId);

}
