package pl.karol.horyzont.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.BasicUpdate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import pl.karol.horyzont.models.User;


public class CustomUserRepositoryImpl implements CustomUserRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void partialUpdate(String userId, String fieldName, Object fieldValue) {
        mongoTemplate.findAndModify(BasicQuery.query(Criteria.where("id").is(userId)), BasicUpdate.update(fieldName, fieldValue), FindAndModifyOptions.none(), User.class);
    }


    @Override
    public String findUsersCurrency(String userId) {
        Query query = new Query(Criteria.where("id").is(userId));
        User _user = (User) mongoTemplate.findOne(query, User.class);
        return _user.getCurrencies();
    }



}
